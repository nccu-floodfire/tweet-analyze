import styled, { keyframes } from "styled-components";

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
	height: 100%;
	margin-top: 100px;
`;

export const Content = styled.div`
	height: 100%;
	display: flex;
`;

export const ClosedSideBar = styled.header`
	overflow-y: auto; 

	max-width: 7.5%;
	width: 100%;
	height: 100%;
	

	border-radius: 0 12px 12px 0;

	background: var(--second-background);

	position: fixed;
	left: 0;
	top: 0;
	z-index: 10000;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;

	svg {
		color: #f9f9f9;
	}

	ul li {
		cursor: pointer;
	}

	/* Links principais do app */
	nav {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;

		> button {
			width: 100%;
			padding: 25%;

			&:hover {
				svg {
					path {
						color: var(--third-color);
					}
				}
			}
		}

		> button svg {
			width: 75%;
			height: 75%;

			color: #c4c4c4;
		}

		> img {
			width: 50%;
			height: 50%;
			border-radius: 50%;
			margin-top: 40%;
		}

		ul {
			margin-top: 100%;
			width: 100%;
			text-align: center;
			display: flex;
			align-items: center;
			flex-direction: column;

			a {
				width: 100%;
				padding: 30%;
				border-radius: 8px 0 0 8px;

				display: flex;
				align-items: center;
				justify-content: center;

				transition: background 0.3s;

				&:hover {
					background: var(--primary-background);

					svg {
						path {
							color: var(--third-color);
						}
					}
				}
				svg {
					width: 75%;
					height: 75%;
				}
			}
		}
	}

	
	
`;

export const OpenSideBar = styled.header`
	

	height: 100%;
	width: 100%;

	position: fixed;
	left: 0;
	top: 0;
	z-index: 10000;
	background: var(--shadow-black-color);

	display: flex;
	align-items: center;

	svg {
		color: #f9f9f9;
	}

	section {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;

		max-width: 25%;
		height: 100%;

		background: var(--second-background);
		border-radius: 0 12px 12px 0;

		ul li {
			cursor: pointer;
		}

		/* Links principais do app */
		nav {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;

			div {
				margin-top: 20%;

				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 15%;
				flex-direction: row;
				gap: 5%;

				img {
					width: 40%;
					height: 40%;
					border-radius: 50%;
				}

				h1 {
					color: #fff;
					font-size: 40px;
					// animation: ${appearFromRight} 0.1s;
				}

				button {
					cursor: pointer;
					&:hover {
						svg path {
							color: var(--third-color);
						}
					}

					svg {
						width: 32%;
						height: 32%;

						color: #c4c4c4;
					}
				}
			}

			ul {
				margin-top: 30%;
				width: 100%;
				text-align: left;
				display: flex;
				flex-direction: column;

				h2 {
					font-size: 40px;
					color: #fff;
				}
				a {
					color: #c4c4c4;
					padding: 40px 20px;
					border-radius: 8px 0 0 8px;

					display: flex;
					align-items: center;
					gap: 15%;

					transition: background 0.3s;
					&:hover {
						background: var(--shadow-black-color);

						svg path {
							color: var(--third-color);
						}
					}

					p {
						animation: ${appearFromRight} 0.4s;
					}

					svg {
						padding-left: 15%;
						width: 50px;
						height: 50px;
					}
				}
			}
		}

		
	}

	aside {
		width: 100%;
		height: 100%;
	}
`;
