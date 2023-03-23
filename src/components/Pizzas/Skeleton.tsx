import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="138" cy="136" r="125" />
		<rect x="0" y="340" rx="10" ry="10" width="278" height="88" />
		<rect x="-5" y="294" rx="0" ry="0" width="288" height="21" />
		<rect x="60" y="338" rx="0" ry="0" width="1" height="0" />
		<rect x="4" y="457" rx="10" ry="10" width="90" height="30" />
		<rect x="120" y="447" rx="14" ry="14" width="152" height="45" />
	</ContentLoader>
)

export default Skeleton
