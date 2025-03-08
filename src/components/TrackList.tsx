import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TrackList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingBottom: 128, paddingTop: 10 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
					<Text style={utilsStyles.emptyContentText}>No tracks found.</Text>
				</View>
			}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TrackList
