```json
{
  "toolDefinitions": {
    "applyDocumentOperations": {
      "inputSchema": {
        "type": "object",
        "properties": {
          "operations": {
            "type": "array",
            "items": {
              "anyOf": [
                {
                  "type": "object",
                  "description": "Update a block",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["update"]
                    },
                    "id": {
                      "type": "string",
                      "description": "id of block to update"
                    },
                    "block": {
                      "type": "string",
                      "description": "html of block (MUST be a single HTML element)"
                    }
                  },
                  "required": ["type", "id", "block"],
                  "additionalProperties": false
                },
                {
                  "type": "object",
                  "description": "Insert new blocks",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["add"]
                    },
                    "referenceId": {
                      "type": "string",
                      "description": "MUST be an id of a block in the document"
                    },
                    "position": {
                      "type": "string",
                      "enum": ["before", "after"],
                      "description": "`after` to add blocks AFTER (below) the block with `referenceId`, `before` to add the block BEFORE (above)"
                    },
                    "blocks": {
                      "items": {
                        "type": "string",
                        "description": "html of block (MUST be a single, VALID HTML element)"
                      },
                      "type": "array"
                    }
                  },
                  "required": ["type", "referenceId", "position", "blocks"],
                  "additionalProperties": false
                },
                {
                  "type": "object",
                  "description": "Delete a block",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["delete"]
                    },
                    "id": {
                      "type": "string",
                      "description": "id of block to delete"
                    }
                  },
                  "required": ["type", "id"],
                  "additionalProperties": false
                }
              ]
            }
          }
        },
        "additionalProperties": false,
        "required": ["operations"]
      },
      "outputSchema": {
        "type": "object"
      }
    }
  },
  "id": "U4YBMBkR3IoJTVXr",
  "messages": [
    {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "привет"
        }
      ],
      "metadata": {
        "documentState": {
          "selection": false,
          "blocks": [
            {
              "id": "62419e3c-d9bd-48c2-a01d-e914738262b5$",
              "block": "<p>/</p>"
            },
            {
              "id": "2ab69138-236a-4dfc-b046-6877139d883d$",
              "block": "<p></p>"
            },
            {
              "cursor": true
            }
          ],
          "isEmptyDocument": false
        }
      },
      "id": "CQfqQhCPJ8dGbWN2"
    }
  ],
  "trigger": "submit-message"
}
```
