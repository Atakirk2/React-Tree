import { useState, useEffect } from "react";
import classes from "./TreeNode.module.css";
import useKeyPress from "../Hooks/use-keyPress";
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
  // keyboard traversing part
  const [cursor, setCursor] = useState(0);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const [hovered, setHovered] = useState(false);
  const enterPress = useKeyPress("Enter");

  useEffect(() => {
    if (downPress) {
      console.log(cursor);
      setCursor((prevState) => (prevState < 13 ? prevState + 1 : prevState));
    }
  }, [downPress]);

  useEffect(() => {
    if (upPress) {
      console.log(cursor);
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (cursor === id) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  }, [downPress,upPress]);

  useEffect(() => {
    if (enterPress && cursor === id) {
      handleIsActive();
    }
  }, [enterPress]);

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
    <div className={`${classes.treeNodeContainer}`}>
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
          <li className={`${hovered ? classes.cursorHovered : ""}`}>
            {props.node.name}
          </li>
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
