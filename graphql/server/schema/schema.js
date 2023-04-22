const { initializeApp } = require("firebase/app");
const { collection, doc, getFirestore, getDocs, getDoc,updateDoc, query, where } = require("firebase/firestore");

const graphql = require('graphql');

const firebaseConfig = {
  apiKey: "AIzaSyBw-zrCkeYHxlW2i7mrve6vB-CAk4W0q0c",
  authDomain: "message-board-9912c.firebaseapp.com",
  databaseURL: "https://message-board-9912c-default-rtdb.firebaseio.com",
  projectId: "message-board-9912c",
  storageBucket: "message-board-9912c.appspot.com",
  messagingSenderId: "203412629703",
  appId: "1:203412629703:web:c5c5688aece6ffce9e36e2",
  measurementId: "G-P4SFN2PE9M"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLInputObjectType
} = graphql
function flatDict(dict) {
    var new_dict = {}
    Object.keys(dict).forEach(function(key) {
        if (typeof dict[key] == "object") {
            var temp_dict = flatDict(dict[key])
            Object.keys(temp_dict).forEach(function(temp_key) {
                new_dict[`${key}.${temp_key}`] = temp_dict[temp_key]
            })
        }
        else if(typeof dict[key] != "undefined"){
            new_dict[key] = dict[key]
        }
     });
     return new_dict  
}
async function updateDocumentById(_collection, doc_id, update) {
    update = flatDict(update)
    console.log(update)
    return new Promise((resolve, reject) => {
        const docRef = doc(db, _collection, doc_id)
        updateDoc(docRef, update).then(() => {
            console.log("updated")
            resolve(update)
        })
    })
}
async function findDocumentByField(_collection, field, value) {
    return new Promise((resolve, reject) => {
        const queryRef = query(collection(db, _collection), where(field, "==", value))
        getDocs(queryRef)
            .then((snapshot) => {
                let messages = [];
                snapshot.docs.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id})
                })
                resolve(messages)
        })
    })
}

async function findDocumentByID(_collection, id) {
    return new Promise((resolve, reject) => {
        const queryRef = doc(db, _collection, id)
        getDoc(queryRef)
            .then((_doc) => {
                resolve({..._doc.data(), id: _doc.id});                
        })
    })
}

const getAllDocs = async (_collection) => {
    return new Promise((resolve, reject) => {
        const colRef = collection(db, _collection)
        let data = []
        getDocs(colRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                data.push({...doc.data(), id: doc.id});
            })
            resolve(data);
        })
    })
} 

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        mail: {type: GraphQLString},
        messages: {
            type: new GraphQLList(MessageType),
            async resolve(parent, args){
                console.log(parent.id)
                return await findDocumentByField('messages', "userId", parent.id)
            }
        }
    })
});

const PositionType = new GraphQLObjectType({
    name: "Position",
    fields: () => ({
        x: {type: GraphQLInt},
        y: {type: GraphQLInt}
    })
});
const PositionArgumentType = new GraphQLInputObjectType({
    name: "PositionInput",
    fields: () => ({
        x: {type: GraphQLInt},
        y: {type: GraphQLInt}
    })
});
const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        position: {
            type: PositionType,
            resolve(parent, args) {
                return {x: parent.position.x, y: parent.position.y}
            } 
        },
        user: {
            type: UserType,
            async resolve(parent, args) {
                console.log(parent.userId)
                return await findDocumentByID('users', parent.userId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args) {
                return await findDocumentByID('users', args.id)
            }
        },
        users:
        {
            type: new GraphQLList(UserType),
            args: {},
            async resolve(parent, args) {
                return await getAllDocs('users');
            }
        },
        message: {
            type: MessageType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args) {
                return await findDocumentByID('messages', args.id)
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            args: {},
            async resolve(parent, args) {
                return await getAllDocs('messages');
            }
        },
        
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // addUser: {
        //     type: UserType,
        //     args: {
        //         username: {type: GraphQLString},
        //         firstName: {type: GraphQLString},
        //         lastName: {type: GraphQLString},
        //         mail: {type: GraphQLString},
        //     },
        //     resolve(parent, args) {
        //         let user = new User({
        //             username: args.username,
        //             firstName: args.firstName,
        //             lastName: args.lastName,
        //             mail: args.mail,
        //         });
        //         return user.save()
        //     }
        // },
        // deleteUser:
        // {
        //     type: UserType,
        //     args: {id: {type: GraphQLID}},
        //     resolve(parent, args) {
        //         User.findById(args.id).deleteOne()
        //     }
        // },
        // addMessage: {
        //     type: MessageType,
        //     args: {
        //         userId: {type: GraphQLID},
        //         title: {type: GraphQLString},
        //         content: {type: GraphQLString},
        //     },
        //     resolve(parent, args) {
        //         const db = getDatabase();
        //         set(ref(db, 'messages/' + args.id), {
        //             title: args.title,
        //             content: args.content,
        //             userId: args.userId
        //         });
        //         let message = new Message({
        //             title: args.title,
        //             content: args.content,
        //             userId: args.userId
        //         });
        //         return message.save()
        //     }
        // },
        updateMessage: {
            type: MessageType,
            args: {
                id: {type: GraphQLID},
                title: {type: GraphQLString},
                content: {type: GraphQLString},
                position: {type: PositionArgumentType}
            },
            async resolve(parent, args) {
                return await updateDocumentById("messages", args.id, {
                    title: args.title,
                    content: args.content,
                    position: args.position
                });
            }
        },
        // deleteMessage: {
        //     type: MessageType,
        //     args: {id: {type: GraphQLID}},
        //     resolve(parent, args) {
        //         Message.findById(args.id).deleteOne()
        //     }
        // },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});