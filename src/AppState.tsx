export const AppState = {
  root: {
    id: "root",
    parentId: null,
    childrenIds: ["A", "B", "X"]
  },
  A: {
    id: "A",
    parentId: "root",
    childrenIds: []
  },
  B: {
    id: "B",
    parentId: "root",
    childrenIds: ["C", "D"]
  },
  C: {
    id: "C",
    parentId: "B",
    childrenIds: []
  },
  D: {
    id: "D",
    parentId: "B",
    childrenIds: ["E", "F", "G"]
  },
  E: {
    id: "E",
    parentId: "D",
    childrenIds: []
  },
  F: {
    id: "F",
    parentId: "D",
    childrenIds: []
  },
  G: {
    id: "G",
    parentId: "D",
    childrenIds: []
  },
  X: {
    id: "X",
    parentId: "root",
    childrenIds: ["Y"]
  },
  Y: {
    id: "Y",
    parentId: "X",
    childrenIds: ["Z"]
  },
  Z: {
    id: "Z",
    parentId: "Y",
    childrenIds: []
  }
} as Record<
  string,
  {
    id: string;
    parentId: string;
    childrenIds: string[];
  }
>;
