import React, { useState, DragEvent, MouseEvent, FC } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Edge,
  ElementId,
  Node,
  FlowElement,
  Handle,
  Position,
  NodeProps,
  NodeTypesType,
  Connection,
} from 'react-flow-renderer';

import computador from '../imagens/computador.jpg';
import cpu from '../imagens/CPU.png';
import disk from '../imagens/Disk.jpg';
import memory from '../imagens/memory.png';
import network from '../imagens/network.png';
import process from '../imagens/Processes.png';


import Sidebar from './Sidebar';

import './dnd.css';


let id = 0;
export const getId = (): ElementId => `node_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>([]);
  const onConnect = (params: Connection | Edge) => {
    const { source, target } = params
    if (!source || !target) {
      return null
    }
    addEdgeInConnections(source, target)
    setElements((els) => addEdge(params, els));
  }
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);
  const onElementClick = (_: MouseEvent, element: FlowElement) => {
    console.log(element)
  }

  const addEdgeInConnections = function (source: string, target: string): void | null {
    const computer = getElement(target)
    const component = getElement(source)
    if (!computer || !component) {
      return null
    }
    computer?.data.connections.push({ type: component?.type, id: component.id })
    component?.data.connections.push({ type: computer?.type, id: computer.id })

    setElements((els) => els.map(el => {
      if (el.id === computer.id) {
        el.data.connections = computer.data.connections
      }
      else if (el.id === component.id) {
        el.data.connections = component.data.connections
      }
      return el
    }));
  }

  const getElement = function (id: string | null): Node | null {
    let element: any
    if (id) {
      setElements((es) => {
        element = es.find(e => e.id === id)
        return es
      });
    }

    return element
  }

  const isValidConnection = (connection: Connection) => {
    const { source, target } = connection
    const computer = getElement(target)
    const component = getElement(source)
    if (!computer || !component) {
      return false
    }

    // se o componente já tem conexão
    const hasConnection = component.data.connections.length > 0
    if (hasConnection) {
      return false
    }
    // se o computador já tem um componente daquele tipo
    const computerHastComponent = computer.data.connections.find((cp: any) =>
      cp.type === component.type)
    if (computerHastComponent) {
      return false
    }

    console.log(true)
    return true
  }

  //custom nodes

  const CustomComputer: FC<NodeProps> = () => {
    return (
      <>
        <img alt="computer" src={computador} width="100" height="100" />
        <span>Computer </span>
        <Handle type="target" position={Position.Right} isValidConnection={isValidConnection} />
        <Handle type="target" position={Position.Left} isValidConnection={isValidConnection} />
        <Handle type="target" position={Position.Bottom} isValidConnection={isValidConnection} />

      </>
    )
  };

  const CustomCpu: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="cpu" src={cpu} width="100" height="100" />
      <br></br>
      CPU
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>)
  };

  const CustomDisk: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="disk" src={disk} width="100" height="100" />
      <br></br>
      Disk
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>)
  };

  const CustomMemory: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="memory" src={memory} width="100" height="100" />
      <br></br>
      Memory
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>)
  };

  const CustomNetwork: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="network" src={network} width="100" height="100" />
      <br></br>
      Network
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>)
  };

  const CustomProcesses: FC<NodeProps> = ({ type, data }) => {
    return (<>
      <Handle type="source" position={Position.Left} isValidConnection={isValidConnection} />
      <img alt="process" src={process} width="100" height="100" />
      Processes
      <Handle type="source" position={Position.Right} isValidConnection={isValidConnection} />
    </>)
  };

  const nodeTypes: NodeTypesType = {
    computer: CustomComputer,
    cpu: CustomCpu,
    disk: CustomDisk,
    memory: CustomMemory,
    network: CustomNetwork,
    processes: CustomProcesses
  };


  /// BUG: adicona dois nós de uma vez
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (reactFlowInstance && type) {
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: {
          connections: [],
          payload: {}
        }
      };
      setElements((es) => es.concat(newNode));
    }
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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
            className="validationflow"
            selectNodesOnDrag={false}
            onDragOver={onDragOver}
            onNodeDoubleClick={onElementClick}
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
