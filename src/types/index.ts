export interface DataPoint {
  [key: string]: string | number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth?: number;
  }[];
}

export interface DatasetInfo {
  name: string;
  rows: number;
  columns: number;
  size: string;
  lastModified: string;
}

export interface AnalysisResult {
  type: 'summary' | 'visualization' | 'insight';
  title: string;
  content: any;
}