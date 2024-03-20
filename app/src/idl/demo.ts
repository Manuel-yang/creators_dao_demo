export type Demo = {
  "version": "0.1.0",
  "name": "demo",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profilePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "postPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profilePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "postPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "postPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "postNonce",
            "type": "u64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "timeStamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "profilePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAddress",
            "type": "publicKey"
          },
          {
            "name": "postsNonce",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidUser",
      "msg": "invalid user"
    }
  ]
};

export const IDL: Demo = {
  "version": "0.1.0",
  "name": "demo",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profilePda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "postPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "profilePda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "postPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "postPda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "postNonce",
            "type": "u64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "timeStamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "profilePda",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAddress",
            "type": "publicKey"
          },
          {
            "name": "postsNonce",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidUser",
      "msg": "invalid user"
    }
  ]
};
