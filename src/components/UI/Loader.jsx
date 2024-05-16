import React from 'react';

import NSSLoader from '../../assets/nss_logo_animated.svg'
const Loader = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
			<div style={{ width: '100px', height: '100px' }}>
				<object type="image/svg+xml" data={NSSLoader}></object>
			</div>
		</div>
	)
}

export default Loader;