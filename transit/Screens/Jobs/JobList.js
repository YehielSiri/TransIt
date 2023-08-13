import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import JobCard from './JobCard'

var { width } = Dimensions.get("window");

const JobList = (props) => {
    const { item } = props;
    return(
        <TouchableOpacity 
        style={{ width: '50%' }}
        onPress={() => 
            props.navigation.navigate("Job Detail", { item: item})
        }
        >
            <View style={{ width: width / 2, 
                backgroundColor: 'gainsboro'}}
        >
            <JobCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default JobList;