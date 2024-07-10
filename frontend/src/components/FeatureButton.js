import React, { useState } from 'react';
import { CButton, CPopover } from '@coreui/react';
const FeatureButton = () => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };
  return (
    <div>
      <CPopover
        header="Info"
        content="Feature in development!"
        placement="top"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <CButton
          id="feature-button"
          onClick={handleClick}
          style={{ backgroundColor: '#1D899A', color: 'white' }}
        >
          Messaging Feature
        </CButton>
      </CPopover>
    </div>
  );
};
export default FeatureButton;