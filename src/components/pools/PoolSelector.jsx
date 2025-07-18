import { useEffect, useState } from 'react';
import Select from 'react-select';
import { POOL_META } from '../../constants/pools';
import { useAuth } from '../../context/useAuth';
import { db } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

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

const customOption = ({ data, innerRef, innerProps }) => (
  <div
    ref={innerRef}
    {...innerProps}
    style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}
  >
    <img src={data.icon} alt="" style={{ width: 20, marginRight: 8 }} />
    {data.label}
  </div>
);

const PoolSelector = () => {
  const { user, settings } = useAuth();
  const initial = settings?.pool || 'ethermine';
  const [selectedPool, setSelectedPool] = useState(initial);

  // Sync when settings change (e.g. from Firestore)
  useEffect(() => {
    if (settings?.pool && settings.pool !== selectedPool) {
      setSelectedPool(settings.pool);
    }
  }, [settings?.pool]);

  const handleChange = async (selectedOption) => {
    const newPool = selectedOption.value;
    setSelectedPool(newPool); // 🔥 Instant UI update

    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(
        userDoc,
        {
          settings: {
            ...settings,
            pool: newPool,
          },
        },
        { merge: true }
      );
    }
  };

  return (
    <div style={{ marginBottom: '1rem', maxWidth: 300 }}>
      <label htmlFor="pool" style={{ fontWeight: 'bold' }}>Select Pool:</label>
      <Select
        id="pool"
        options={poolOptions}
        value={poolOptions.find((opt) => opt.value === selectedPool)}
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