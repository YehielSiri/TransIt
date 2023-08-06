import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from "../../assets/common/baseUrl"
import axios from 'axios';

import JobList from "./JobList";
import SearchedJob from "./SearchedJobs";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get('window')

const JobContainer = (props) => {
  const [jobs, setJobs] = useState([]);
  const [jobsFiltered, setJobsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [jobsCtg, setJobsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
        setActive(-1);
        
        // Products
        axios
          .get(`${baseURL}jobs`)
          .then((res) => {
            setJobs(res.data);
            setJobsFiltered(res.data);
            setJobsCtg(res.data);
            setInitialState(res.data);
            setLoading(false)
          })
          .catch((error) => {
            console.log('Api call error')
          })
    
        // Categories
        axios
          .get(`${baseURL}categories`)
          .then((res) => {
            setCategories(res.data)
          })
          .catch((error) => {
            console.log('Api call error')
          })
    
        return () => {
          setJobs([]);
          setJobsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        };
      },
      [],
    )
  ))
    
   
  

  // Job Methods
  const searchJob = (text) => {
    setJobsFiltered(
        jobs.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setJobsCtg(initialState), setActive(true)]
        : [
            setJobsCtg(
                jobs.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
    {loading == false ? (
 <Container>
 <Header searchBar rounded>
   <Item>
     <Icon name="ios-search" />
     <Input
       placeholder="Search"
       onFocus={openList}
       onChangeText={(text) => searchJob(text)}
     />
     {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
   </Item>
 </Header>
 {focus == true ? (
   <SearchedJob 
   navigation={props.navigation}
   jobsFiltered={jobsFiltered} />
 ) : (
   <ScrollView>
     <View>
       <View>
         <Banner />
       </View>
       <View>
         <CategoryFilter
           categories={categories}
           categoryFilter={changeCtg}
           jobsCtg={jobsCtg}
           active={active}
           setActive={setActive}
         />
       </View>
       {jobsCtg.length > 0 ? (
       <View style={styles.listContainer}>
           {jobsCtg.map((item) => {
               return(
                   <JobList
                       navigation={props.navigation}
                       key={item.name}
                       item={item}
                   />
               )
           })}
       </View>
       ) : (
           <View style={[styles.center, { height: height / 2}]}>
               <Text>No jobs found</Text>
           </View>
       )}
      
     </View>
   </ScrollView>
 )}
</Container>
    ) : (
      // Loading
      <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
        <ActivityIndicator size="large" color="red" />
      </Container>
    )}
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default JobContainer;