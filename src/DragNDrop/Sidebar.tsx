import React, { DragEvent } from 'react';
import computador from '../imagens/computador.png';
import cpu from '../imagens/CPU.png';
import disk from '../imagens/Disk.png';
import memory from '../imagens/memory.png';
import network from '../imagens/network.png';
import process from '../imagens/Processes.png';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <aside>

      <div className="description">Arraste os nós para o painel à esquerda e ligue o Computador aos componentes.</div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'computer')} draggable>
        <img alt="computer" src={computador} width="100" height="100" />
        Computer
      </div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'cpu')} draggable>
        <img alt="cpu" src={cpu} width="100" height="100" />
        <br></br>
        CPU
      </div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'disk')} draggable>
        <img alt="disk" src={disk} width="100" height="100" />
        <br></br>
        Disk
      </div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'memory')} draggable>
        <img alt="memory" src={memory} width="100" height="100" />
        <br></br>
        Memory
      </div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'network')} draggable>
        <img alt="network" src={network} width="100" height="100" />
        <br></br>
        Network
      </div>
      <div className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'processes')} draggable>
        <img alt="process" src={process} width="100" height="100" />
        Processes
      </div>
    </aside>
  );
};

export default Sidebar;
