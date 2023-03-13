export type SolanaProgramEdu = {
  version: "0.1.0";
  name: "solana_program_edu";
  instructions: [
    {
      name: "createCourse";
      accounts: [
        {
          name: "course";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "id";
          type: "u64";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "instructor";
          type: "publicKey";
        },
        {
          name: "price";
          type: "u64";
        }
      ];
    },
    {
      name: "enroll";
      accounts: [
        {
          name: "student";
          isMut: true;
          isSigner: true;
        },
        {
          name: "course";
          isMut: true;
          isSigner: false;
        },
        {
          name: "enrollment";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "courseId";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "course";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "id";
            type: "u64";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "instructor";
            type: "publicKey";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "price";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "enrollment";
      type: {
        kind: "struct";
        fields: [
          {
            name: "course";
            type: "publicKey";
          },
          {
            name: "student";
            type: "publicKey";
          },
          {
            name: "startDate";
            type: "i64";
          },
          {
            name: "completionDate";
            type: {
              option: "i64";
            };
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "CourseNameTooLong";
      msg: "Course name is too long";
    },
    {
      code: 6001;
      name: "CourseDescriptionTooLong";
      msg: "Course description is too long";
    },
    {
      code: 6002;
      name: "CoursePriceTooLow";
      msg: "Course price must be greater than 0";
    },
    {
      code: 6003;
      name: "InvalidCourseAccount";
      msg: "Invalid course account";
    }
  ];
};

export const IDL: SolanaProgramEdu = {
  version: "0.1.0",
  name: "solana_program_edu",
  instructions: [
    {
      name: "createCourse",
      accounts: [
        {
          name: "course",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "id",
          type: "u64",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "instructor",
          type: "publicKey",
        },
        {
          name: "price",
          type: "u64",
        },
      ],
    },
    {
      name: "enroll",
      accounts: [
        {
          name: "student",
          isMut: true,
          isSigner: true,
        },
        {
          name: "course",
          isMut: true,
          isSigner: false,
        },
        {
          name: "enrollment",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "courseId",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "course",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "instructor",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "price",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "enrollment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "course",
            type: "publicKey",
          },
          {
            name: "student",
            type: "publicKey",
          },
          {
            name: "startDate",
            type: "i64",
          },
          {
            name: "completionDate",
            type: {
              option: "i64",
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "CourseNameTooLong",
      msg: "Course name is too long",
    },
    {
      code: 6001,
      name: "CourseDescriptionTooLong",
      msg: "Course description is too long",
    },
    {
      code: 6002,
      name: "CoursePriceTooLow",
      msg: "Course price must be greater than 0",
    },
    {
      code: 6003,
      name: "InvalidCourseAccount",
      msg: "Invalid course account",
    },
  ],
};
