import Image from "next/image";
import { MouseEventHandler } from "react";
import Pen from "../../assets/pen.png"
const EditButton = (props: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; }) => {
    return (
      <div className="avatar ml-8">
        <div className="w-24 rounded">
          <button  onClick={props.onClick} className="btn btn-outline btn-secondary m-3">
            <Image src={Pen} height={32} width={32} alt="Pen Image" />
          </button>
        </div>
      </div>
    );
  };
  export default EditButton