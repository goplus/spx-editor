import React from "react";

export default function Blocks() {
  return (
    <div className="scratchCategoryMenu">
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-motion categorySelected">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(76, 151, 255)", "borderColor": "rgb(51, 115, 204)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Motion</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-looks">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(153, 102, 255)", "borderColor": "rgb(119, 77, 203)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Looks</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-sound">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(214, 92, 214)", "borderColor": "rgb(189, 66, 189)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Sound</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-events">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(255, 213, 0)", "borderColor": "rgb(204, 153, 0)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Events</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-control">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(255, 171, 25)", "borderColor": "rgb(207, 139, 23)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Control</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-sensing">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(76, 191, 230)", "borderColor": "rgb(46, 142, 184)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Sensing</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-operators">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(64, 191, 74)", "borderColor": "rgb(56, 148, 56)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Operators</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-variables">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(255, 140, 26)", "borderColor": "rgb(219, 110, 0)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">Variables</div>
        </div>
      </div>
      <div className="scratchCategoryMenuRow">
        <div className="scratchCategoryMenuItem scratchCategoryId-myBlocks">
          <div
            className="scratchCategoryItemBubble"
            style={{"backgroundColor": "rgb(255, 102, 128)", "borderColor": "rgb(255, 77, 106)"}}
          ></div>
          <div className="scratchCategoryMenuItemLabel">My Blocks</div>
        </div>
      </div>
    </div>
  );
}
