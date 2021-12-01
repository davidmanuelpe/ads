import React, { DragEvent } from 'react';
import computador from '../imagens/computador.jpg';
import cpu from '../imagens/CPU.png';
import disk from '../imagens/Disk.jpg';
import memory from '../imagens/memory.png';
import network from '../imagens/network.png';
import process from '../imagens/Processes.png';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

// const onDragStart = (event: DragEvent, nodeType: string) => {
//   event.dataTransfer.setDragImage(<img src={computador}, 0, 20);
//   event.dataTransfer.effectAllowed = 'move';
// };




const Sidebar = () => {
  return (
    <aside>

      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'computador')} draggable>
        <img src={computador} width="100" height="100" />
        Computer
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        <img src={cpu} width="100" height="100" />
        <br></br>
        CPU
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        <img src={disk} width="100" height="100" />
        <br></br>
        Disk
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        <img src={memory} width="100" height="100" />
        <br></br>
        Memory
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        <img src={network} width="100" height="100" />
        <br></br>
        Network
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        <img src={process} width="100" height="100" />
        Processes
      </div>
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
        Blue Node
      </div>


      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output')} draggable>
        Red Node
      </div>
    </aside>
  );
};

export default Sidebar;
