{{- define "messaging-board.fullname" }}
{{ printf "%s-%s" .Chart.Name .Release.Name }}
{{- end }}

{{- define "messaging-board.labels"}}
app: {{ include "messaging-board.fullname" }}
{{- end }}