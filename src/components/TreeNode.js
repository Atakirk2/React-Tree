import { useState, useEffect, useRef } from "react";
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
  const [hovered, setHovered] = useState(false);
  const cursor = props.cursor;
  const children = props.node.children;
  const id = props.node.id;
  const setParentSelectedChilds = props.setParentSelectedChilds;
  const rootIDs = [1, 10];
  const isRoot = rootIDs.includes(id);
  const enterPress = useKeyPress("Enter");
  // keyboard traversing part
  const checkboxRef = useRef();

  useEffect(()=>{
    checkIfHovered();
  },[cursor])
  
  useEffect(()=>{
    if (enterPress && cursor === id) {
      handleIsActive();
      console.log('enterpress')
    }
  },[enterPress])
  function checkIfHovered(){
    console.log('if hovered worked')
    if (cursor === id) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  }

  function handleIsActive() {
    setIsActive((prev) => !prev);
  }
  function handleOnChange() {
    setIsSelected(checkboxRef.current.checked);
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
            ref = {checkboxRef}
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
            cursor = {cursor}
          />
        ))}
    </div>
  );
}
