import {Gif} from '@remotion/gif';
import {useEffect, useRef} from 'react';
import {Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const GifTest: React.FC = () => {
	const {width, height} = useVideoConfig();
	const giphy = staticFile('giphy.gif');
	const ref1 = useRef<HTMLCanvasElement>(null);
	const ref2 = useRef<HTMLCanvasElement>(null);
	const ref3 = useRef<HTMLCanvasElement>(null);
	const ref4 = useRef<HTMLCanvasElement>(null);
	const frame = useCurrentFrame();

	useEffect(() => {
		console.log(
			frame,
			ref1.current?.tagName ?? 'Not rendered',
			ref2.current?.tagName ?? 'Not rendered',
			ref3.current?.tagName ?? 'Not rendered',
			ref4.current?.tagName ?? 'Not rendered'
		);
	}, [frame]);

	return (
		<div style={{flex: 1, backgroundColor: 'black'}}>
			<Sequence durationInFrames={50}>
				<Gif ref={ref1} src={giphy} width={width} height={height} fit="fill" />
			</Sequence>

			<Sequence from={50} durationInFrames={50}>
				<Gif
					ref={ref2}
					src="https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif"
					width={width}
					height={height}
					fit="cover"
				/>
			</Sequence>

			<Sequence from={100} durationInFrames={50}>
				<Gif
					ref={ref3}
					src="https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif"
					width={width}
					height={height}
					fit="contain"
				/>
			</Sequence>
			<Sequence
				from={150}
				durationInFrames={50}
				style={{
					backgroundColor: 'white',
				}}
			>
				<Gif
					ref={ref4}
					src={staticFile('disposal-type-3.gif')}
					width={width}
					height={height}
					fit="fill"
				/>
			</Sequence>
		</div>
	);
};

export default GifTest;
