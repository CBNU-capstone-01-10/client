// COMPONENT: 막대 그래프
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import styled from "styled-components";

const BarChartWrapper = styled.div`
  width: 100%;
`;
const ChartCanvas = styled.canvas`
  width: 100%;
`;

interface IChartRef extends HTMLCanvasElement {
  chart?: Chart;
}

interface IBarChartProps {
  labels: string[];
  label: string;
  data: number[];
}
export default function BarChart({ labels, label, data }: IBarChartProps) {
  const chartRef = useRef<IChartRef | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 기존 차트 인스턴스가 존재하면 파괴
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // canvas의 2D context 가져오기
      const context = chartRef.current.getContext("2d");

      // context가 null이 아닌지 확인
      if (context) {
        // 새로운 차트 인스턴스 생성
        const newChart = new Chart(context, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: label,
                data: data,
                backgroundColor: "rgba(31, 135, 254, 100)",
                barThickness: 12,
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        });

        // chartRef.current에 차트 인스턴스 저장
        chartRef.current.chart = newChart;
      }
    }
  }, [labels, label, data]);

  return (
    <BarChartWrapper>
      <ChartCanvas ref={chartRef} />
    </BarChartWrapper>
  );
}
