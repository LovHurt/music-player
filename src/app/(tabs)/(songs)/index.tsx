import library from '@/assets/data/library.json'
import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Search songs' } })

	const filteredTracks = useMemo(() => {
		if (!search) return library
		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList tracks={filteredTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
