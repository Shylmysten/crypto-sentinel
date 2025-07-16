// src/components/PoolSelector.jsx
import Select from 'react-select';
import { POOL_META } from '../constants/pools';

const poolOptions = Object.entries(POOL_META).map(([value, meta]) => ({
  value,
  label: meta.name,
  icon: meta.icon,
}));

const customSingleValue = ({ data }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={data.icon} alt="" style={{ width: 20, marginRight: 8 }} />
    {data.label}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
      <img src={data.icon} alt="" style={{ width: 20, marginRight: 8 }} />
      {data.label}
    </div>
  );
};

const PoolSelector = ({ onSelect }) => {
  const defaultOption = poolOptions[0];

  const handleChange = (selectedOption) => {
    onSelect(selectedOption.value);
  };

  return (
    <div style={{ marginBottom: '1rem', maxWidth: 300 }}>
      <label htmlFor="pool" style={{ fontWeight: 'bold' }}>Select Pool:</label>
      <Select
        id="pool"
        options={poolOptions}
        defaultValue={defaultOption}
        onChange={handleChange}
        components={{ Option: customOption, SingleValue: customSingleValue }}
        styles={{
          control: (base) => ({ ...base, marginTop: 4 }),
        }}
      />
    </div>
  );
};

export default PoolSelector;

