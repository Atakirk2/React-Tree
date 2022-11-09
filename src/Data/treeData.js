const treeData = [
  {
    id: 1,
    name: "Company A",
    active: true,
    children: [
      {
        id: 2,
        name: "Team A-1",
        active: false,
        children: [
          {
            id: 3,
            name: "Person 1",
            active: false,
            children: [],
          },
          {
            id: 4,
            name: "Person 2",
            active: false,
            children: [],
          },
          {
            id: 5,
            name: "Person 3",
            active: false,
            children: [],
          },
        ],
      },
      {
        id: 6,
        name: "Team A-2",
        active: false,
        children: [
          {
            id: 7,
            name: "Person 1",
            active: false,
            children: [],
          },
          {
            id: 8,
            name: "Person 2",
            active: false,
            children: [],
          },
          {
            id: 9,
            name: "Person 3",
            active: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Company B",
    active: true,
    children: [
      {
        id: 11,
        name: "Team B-1",
        active: false,
        children: [
          {
            id: 12,
            name: "Person 1",
            active: false,
            children: [],
          },
          {
            id: 13,
            name: "Person 2",
            active: false,
            children: [],
          },
        ],
      },
    ],
  },
];
export default treeData;
