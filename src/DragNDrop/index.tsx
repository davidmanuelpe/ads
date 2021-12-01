import React, { useState, DragEvent, FC } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node,
  Handle,
  Position,
  NodeProps,
  NodeTypesType,
} from 'react-flow-renderer';
import computador from '../imagens/computador.jpg';


import Sidebar from './Sidebar';

import './dnd.css';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }
];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);

  const isValidConnection = (connection: Connection) => connection.target === 'B';
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      console.log(type)
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: {
          label: type === 'computador' ?
            (<div>
              <img src={computador} width="100" height="100" />
              <span>Computer </span>
            </div>) : 'hello'
        },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  const CustomInput: FC<NodeProps> = () => (
    <>
      <div>Only connectable with B</div>
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>
  );

  const CustomNode: FC<NodeProps> = ({ id }) => (
    <>
      <Handle type="target" position={Position.Left} isValidConnection={isValidConnection} />
      <div>{id}</div>
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>
  );

  const nodeTypes: NodeTypesType = {
    computador: CustomInput,
    customnode: CustomNode,
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
