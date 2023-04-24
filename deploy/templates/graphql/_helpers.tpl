{{- define "graphql.fullname" }}
{{ include "messaging-board.fullname "}}-graphql
{{- end }}

{{- define "graphql.labels"}}
app: {{ include "graphql.fullname" }}
{{- end }}

{{-define "graphql.url" }}
{{ printf "%s-%s" .Release.Namespace {{ include "graphql.fullname" }}
{{- end }}