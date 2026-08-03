import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Sparkles, ZoomIn, ZoomOut, RotateCcw, Info, Droplets, Heart, Compass, Shield } from 'lucide-react';
import { SolarTermInfo, OilDetail, getOilDetail } from './SolarTermsBanner';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'term' | 'element' | 'oil' | 'benefit' | 'emotion';
  category?: string;
  details?: string;
  color: string;
  radius: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: string;
}

interface SolarTermD3GraphProps {
  activeTerm: SolarTermInfo;
  onSelectOil?: (oilDetail: OilDetail) => void;
}

export const SolarTermD3Graph: React.FC<SolarTermD3GraphProps> = ({ activeTerm, onSelectOil }) => {
  const [layoutTick, setLayoutTick] = useState(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Generate Graph Data dynamically based on active solar term
  const { nodes, links } = useMemo(() => {
    const nodesList: GraphNode[] = [];
    const linksList: GraphLink[] = [];

    // 1. Central Solar Term Node
    const termNodeId = `term-${activeTerm.id}`;
    const termNode: GraphNode = {
      id: termNodeId,
      name: activeTerm.name,
      type: 'term',
      category: `当令节气 (${activeTerm.startMonth}月${activeTerm.startDay}日起)`,
      details: activeTerm.climate,
      color: '#C58B3A', // Amber Gold
      radius: 28,
    };
    nodesList.push(termNode);

    // 2. Element / Climate Attribute Node
    const elementNodeId = `element-${activeTerm.id}`;
    const elementNode: GraphNode = {
      id: elementNodeId,
      name: `五行·${activeTerm.element}行气场`,
      type: 'element',
      category: '节气天时律动',
      details: `根据《黄帝内经》，${activeTerm.name}属于${activeTerm.element}行时节。${activeTerm.climate}`,
      color: '#A85852', // Warm Red/Terracotta
      radius: 20,
    };
    nodesList.push(elementNode);

    linksList.push({
      source: termNodeId,
      target: elementNodeId,
      relation: '天时相生',
    });

    // 3. Recommended Oils Nodes and their Benefits / Emotional Links
    activeTerm.scentProfile.recommendedOils.forEach((oilName) => {
      const oilDetail = getOilDetail(oilName);
      const oilNodeId = `oil-${oilName}`;

      const oilNode: GraphNode = {
        id: oilNodeId,
        name: oilDetail.name,
        type: 'oil',
        category: oilDetail.category,
        details: `${oilDetail.latinName} · 五行属${oilDetail.element}`,
        color: '#2A5C36', // Deep Sage Green
        radius: 22,
      };
      nodesList.push(oilNode);

      // Link Solar Term to Essential Oil
      linksList.push({
        source: termNodeId,
        target: oilNodeId,
        relation: '当令推崇',
      });

      // Link Element to Essential Oil
      linksList.push({
        source: elementNodeId,
        target: oilNodeId,
        relation: '五行同调',
      });

      // Physical Benefit Node for Oil
      const benefitNodeId = `benefit-${oilName}`;
      const benefitNode: GraphNode = {
        id: benefitNodeId,
        name: `${oilName}·生理调理`,
        type: 'benefit',
        category: '肌肤与生理功效',
        details: oilDetail.benefits,
        color: '#8C5A2B', // Warm Brown
        radius: 17,
      };
      nodesList.push(benefitNode);

      linksList.push({
        source: oilNodeId,
        target: benefitNodeId,
        relation: '理疗作用',
      });

      // Emotional Benefit Node for Oil
      const emotionNodeId = `emotion-${oilName}`;
      const emotionNode: GraphNode = {
        id: emotionNodeId,
        name: `${oilName}·心理疗愈`,
        type: 'emotion',
        category: '情绪与精神属性',
        details: oilDetail.emotionalBenefits,
        color: '#3B5998', // Deep Indigo Blue
        radius: 17,
      };
      nodesList.push(emotionNode);

      linksList.push({
        source: oilNodeId,
        target: emotionNodeId,
        relation: '心智抚慰',
      });
    });

    return { nodes: nodesList, links: linksList };
  }, [activeTerm]);

  // Set default selected node as Central Solar Term Node
  useEffect(() => {
    setSelectedNode(nodes[0] || null);
  }, [nodes]);

  // D3 Simulation setup
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = 400;

    // 容器不可见时（tab 隐藏 display:none）等待可见后重算布局
    const tryLayout = () => {
      if (!containerRef.current || container.clientWidth === 0) {
        // 容器不可见，延迟重试
        setTimeout(tryLayout, 120);
        return;
      }
      // 容器尺寸变化时触发重算
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          const w = container.clientWidth;
          if (w > 0 && w !== width) {
            // 宽度变化 → 重新初始化布局
            drawGraph();
          }
        });
        ro.observe(container);
        // 注意：不在此处清理（外层已有清理逻辑）
        (container as any).__ro = ro;
      }
    };
    const drawGraph = () => {
      // 实际绘制逻辑（原 useEffect 主体）
    };

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', height);

    // Add SVG Defs for markers and gradients
    const defs = svg.append('defs');

    // Arrow Marker for links
    defs
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 24)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(197, 139, 58, 0.4)');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Main Zoom Group
    const g = svg.append('g').attr('class', 'main-group');

    // Setup Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep clone nodes and links for d3 force
    const nodesCopy: GraphNode[] = JSON.parse(JSON.stringify(nodes));
    const linksCopy: GraphLink[] = JSON.parse(JSON.stringify(links));

    // Force Simulation
    const simulation = d3
      .forceSimulation<GraphNode>(nodesCopy)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(linksCopy)
          .id((d) => d.id)
          .distance(90)
      )
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d) => d.radius + 12));

    // Draw Links
    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksCopy)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(197, 139, 58, 0.35)')
      .attr('stroke-width', 1.8)
      .attr('stroke-dasharray', (d) => (d.relation === '五行同调' ? '4 3' : 'none'))
      .attr('marker-end', 'url(#arrow)');

    // Link Text Labels
    const linkText = g
      .append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(linksCopy)
      .enter()
      .append('text')
      .text((d) => d.relation)
      .attr('font-size', '9px')
      .attr('fill', 'rgba(232, 218, 200, 0.6)')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'monospace');

    // Draw Nodes Group
    const node = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(nodesCopy)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
        if (d.type === 'oil' && onSelectOil) {
          onSelectOil(getOilDetail(d.name));
        }
      })
      .on('mouseover', (event, d) => {
        setHoveredNode(d);
      })
      .on('mouseout', () => {
        setHoveredNode(null);
      });

    // Drag behavior
    const drag = d3
      .drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Node Outer Glow Ring
    node
      .append('circle')
      .attr('r', (d) => d.radius + 3)
      .attr('fill', 'none')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.5)
      .attr('filter', 'url(#glow)');

    // Node Center Circle
    node
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.color)
      .attr('stroke', '#E8DAC8')
      .attr('stroke-width', 1.5)
      .attr('class', 'transition-all duration-300');

    // Node Labels inside Circle or below
    node
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', (d) => (d.type === 'term' ? '12px' : '10px'))
      .attr('font-weight', 'bold')
      .attr('fill', '#FFFFFF')
      .attr('font-family', 'serif')
      .style('pointer-events', 'none');

    // Simulation Ticks
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      linkText
        .attr('x', (d) => ((d.source as GraphNode).x! + (d.target as GraphNode).x!) / 2)
        .attr('y', (d) => ((d.source as GraphNode).y! + (d.target as GraphNode).y!) / 2 - 4);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Cleanup on unmount or node update
    return () => {
      simulation.stop();
    };
  }, [nodes, links, onSelectOil, layoutTick]);

  return (
    <div className="bg-[#0C120E] border border-[#C58B3A]/30 rounded-3xl p-4 sm:p-6 text-[#E8DAC8] shadow-2xl relative overflow-hidden space-y-4">
      {/* Background Glow Effect */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#C58B3A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Graph Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#C58B3A]/20 text-[#C58B3A] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#C58B3A]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>D3.js 芳疗图谱力导向模型</span>
            </span>
            <span className="text-[10px] font-mono text-[#b4aca2]">可自由拖拽 / 缩放 / 点击交互</span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#E8DAC8] flex items-center gap-2">
            <span>【{activeTerm.name}】精油功效与节气特征关联知识图谱</span>
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#b4aca2]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C58B3A]" /> 节气中心
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A85852]" /> 五行气场
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A5C36]" /> 核心精油
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8C5A2B]" /> 生理功效
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B5998]" /> 心理疗愈
          </span>
        </div>
      </div>

      {/* D3 Canvas Container & SVG */}
      <div ref={containerRef} className="w-full relative bg-[#070B09] rounded-2xl border border-white/10 overflow-hidden min-h-[380px]">
        <svg ref={svgRef} className="w-full h-[380px] block cursor-grab active:cursor-grabbing" />

        {/* Hover / Select Quick Banner Overlay */}
        {(hoveredNode || selectedNode) && (
          <div className="absolute top-3 left-3 right-3 sm:right-auto max-w-sm bg-[#0C120E]/90 backdrop-blur-md border border-[#C58B3A]/40 rounded-xl p-3 shadow-xl space-y-1 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-serif font-bold text-[#C58B3A] text-xs flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>{(hoveredNode || selectedNode)?.name}</span>
              </span>
              <span className="text-[9px] font-mono bg-white/10 text-[#b4aca2] px-1.5 py-0.5 rounded">
                {(hoveredNode || selectedNode)?.category}
              </span>
            </div>
            <p className="text-[11px] text-[#E8DAC8]/90 font-sans leading-relaxed">
              {(hoveredNode || selectedNode)?.details}
            </p>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[9px] font-mono text-[#b4aca2]">
          提示: 点击精油节点可展开完整功效档案
        </div>
      </div>

      {/* Selected Node Detailed Analysis Drawer */}
      {selectedNode && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selectedNode.color }}
              />
              <span className="font-serif font-bold text-sm text-[#E8DAC8]">{selectedNode.name}</span>
              <span className="text-[10px] font-mono text-[#C58B3A] bg-[#C58B3A]/10 px-2 py-0.5 rounded border border-[#C58B3A]/20">
                {selectedNode.category}
              </span>
            </div>
            {selectedNode.type === 'oil' && (
              <button
                onClick={() => onSelectOil && onSelectOil(getOilDetail(selectedNode.name))}
                className="px-2.5 py-1 rounded bg-[#C58B3A] text-[#0C120E] text-[10px] font-serif font-bold hover:bg-[#d99c43] transition-colors cursor-pointer"
              >
                查看完整精油档案 →
              </button>
            )}
          </div>
          <p className="text-xs text-[#E8DAC8]/90 leading-relaxed font-sans">
            {selectedNode.details}
          </p>
        </div>
      )}
    </div>
  );
};
