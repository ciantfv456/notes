{{- define "backend.fullname" }}
{{ include "messaging-board.fullname "}}-backend
{{- end }}

{{- define "backend.labels"}}
app: {{ include "backend.fullname" }}
{{- end }}
