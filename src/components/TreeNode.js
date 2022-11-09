import { useState } from "react";
import classes from "./TreeNode.module.css";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdArrowRightAlt,
} from "react-icons/md";

export default function TreeNode(props) {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedChilds, setSelectedChilds] = useState([]);
  const children = props.node.children;
  const id = props.node.id;
  const setParentSelectedChilds = props.setParentSelectedChilds;
  const parentSelectedChilds = props.parentSelectedChilds;
  const rootIDs = [1, 10];
  const [isRoot, setIsRoot] = useState(rootIDs.includes(id) ? true : false);

  function handleIsActive() {
    setIsActive((prev) => !prev);
  }
  function handleOnChange(e) {
    setIsSelected(e.target.checked);
    informParent();
  }
  function informParent() {
    if (!isSelected) {
      setParentSelectedChilds((prev) => [...prev, id]);
    } else {
      setParentSelectedChilds((prev) =>
        prev.filter((element) => element !== id)
      );
    }
  }

  return (
    <div className={classes.treeNodeContainer}>
      <div className={classes.treeNodeElement}>
        <div onClick={handleIsActive}>
          {isActive ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </div>
        {!isRoot && (
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={isSelected}
            onChange={handleOnChange}
          ></input>
        )}
        <div onClick={handleIsActive}>
          <li>{props.node.name}</li>
        </div>
        <div className={classes.childDisplay}>
          <MdArrowRightAlt />
          {selectedChilds.map((child) => (
            <>
              <div key={child}>{child}</div>
              <div>,</div>
            </>
          ))}
        </div>
      </div>

      {/* RECURSIVE PART */}
      {isActive &&
        children.map((node) => (
          <TreeNode
            setParentSelectedChilds={setSelectedChilds}
            parentSelectedChilds={selectedChilds}
            node={node}
            key={node.id}
          />
        ))}
    </div>
  );
}
