import TreeNode from "./TreeNode";
import data from "../Data/treeData";
import classes from "./Tree.module.css";

export default function Tree() {
  return (
    <div className="tree-container">
      <ul className={classes.treeList}>
        {data.map((data) => (
          <TreeNode node={data} key={data.id} />
        ))}
      </ul>
    </div>
  );
}
