import TreeNode from "./TreeNode";
import data from "../Data/treeData";
import classes from "./Tree.module.css";
import { useEffect, useState } from "react";
import useKeyPress from "../Hooks/use-keyPress";

export default function Tree() {
  const [cursor, setCursor] = useState(0);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");

  useEffect(() => {
    if (downPress) {
      setCursor((prevState) => (prevState < 14 ? prevState + 1 : prevState));
      console.log('downpress')
    }
    if (upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
      console.log('uppress')
    }
  }, [downPress, upPress]);

  return (
    <div className="tree-container">
      <ul className={classes.treeList}>
        {data.map((data) => (
          <TreeNode node={data} key={data.id} cursor={cursor} />
        ))}
      </ul>
    </div>
  );
}
