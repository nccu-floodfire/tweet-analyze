import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import nccu from '../assets/nccu_logo.jpg';

export function SideBar() {
	const [sideBar, setSideBar] = useState(false);

	function handleChangeSideBar() {
		setSideBar((prevState) => !prevState);
	}
	return (
		<Container>
			<Content>
				<div style={{ overflowY: 'auto' }}>
				{!sideBar ? (
					<ClosedSideBar>
						<nav color="white">
							<img src={nccu} alt="Eu" />
							<button onClick={handleChangeSideBar}>
							<ArrowForwardIcon />
							</button>
							<ul>
								<Link to="/" title="上傳檔案">
									<DriveFolderUploadIcon />
								</Link>
								<Link to="/store" title="分析結果">
									<BarChartIcon />
								</Link>
							</ul>
						</nav>
					</ClosedSideBar>
				) : (
					<OpenSideBar>
						<section>
							<nav color="white">
								<div>
									{/* <img src={nccu} alt="Eu" /> */}
									<h1>推特資料視覺化分析工具</h1>
									<button onClick={handleChangeSideBar}>
									<ArrowBackIcon />
									</button>
								</div>
								<ul>
									<Link to="/" title="上傳檔案">
										
										<DriveFolderUploadIcon />
										<h2>上傳檔案</h2>
									</Link>
									<Link to="/store" title="分析結果">
										<BarChartIcon />
										<h2>分析結果</h2>
									</Link>
								</ul>
							</nav>
						</section>
						
						<aside onClick={handleChangeSideBar} />
					</OpenSideBar>
				)}
				</div>
				
			</Content>
		</Container>
	);
}
