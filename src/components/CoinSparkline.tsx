import type { OHLCData } from '@/types';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface CoinSparklineProps {
  data: OHLCData[];
}

const CoinSparkline = ({ data }: CoinSparklineProps) => {
  const sparklinesData = data.map((price) => price.close);

  return (
    <Sparklines
      data={sparklinesData}
      limit={8}
      width={60}
      height={20}
      margin={5}
    >
      <SparklinesLine color="blue" />
    </Sparklines>
  );
};

export default CoinSparkline;
