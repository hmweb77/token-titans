import { MouseEventHandler } from "react";

function PopupComponent(props: { onClose: MouseEventHandler<HTMLButtonElement> | undefined; }) {
    return (
      // Your popup UI here
      <div>
        {/* Content for editing username and bio */}
        <button onClick={props.onClose}>Close</button>
        {/* Add form elements for editing username and bio */}
      </div>
    );
  }

  export default PopupComponent