import { Drawer } from "antd";
import React, { useEffect,useState } from "react";
import CheckBoxComp from "../Checkbox";
import RadioGroupComp from "../RadioGroup";
import SelectBox from "../SelectBox";
import RangeInput from "../RangeInput";
import SwitcherComp from "../Switcher";
import listingService from "@/services/listingService";

function FilterDrawer({ open, onClose, placement ,clearAll, applyAll, serviceTypeFilter,handleFilters,
  radius,location,service,filters,
  isSearchPage=false,category='All',city='All',brough='All',broughLocation='All'
}) {
  const [filterServiceType,setFilterServiceType] = useState(serviceTypeFilter);
  const [filterRadius,setFilterRadius] = useState(radius);
  const [filterCity,setFilterCity] = useState(city);
  const [filterBrough,setFilterBrough] = useState(brough);
  const [filterBroughLocation,setFilterBroughLocation] = useState(broughLocation);
  const [filterLocation,setFilterLocation] = useState(location);
  const [filterService,setFilterService] = useState(service);
  const [locationOptions,setLocationOptions] = useState(location);
  const [serviceOptions,setServiceOptions] = useState(location);
  const [cities,setCities] = useState(null);
  const [broughs,setBroughs] = useState(null);
  const [locations,setLocations] = useState(null);
  const [filterCategory,setFilterCategory] = useState(category);
  const radioBtnList = [
    { value: 1, title: "All" },
    { value: 2, title: "Option One" },
    { value: 3, title: "Option Two" },
    { value: 4, title: "Option Three" },
  ];
  const selectOptionsList = [
    { value: 'All', label: "All" },
    { value: 'IN CALL', label: "In Call" },
    { value: 'OUT CALL', label: "Out Call" }
  ];

  
  const setFilter = (type,value) =>{
    if(type  && type== 'Service Type' && value ){
      handleFilters( type,value)
      setFilterServiceType(value)
    }
    if(type  && type== 'Service' && value ){
      handleFilters( type,value)
      setFilterService(value)
    }
    if(type  && type== 'Radius' && value ){
      handleFilters( type,value)
      setFilterRadius(value)
    }
    if(type  && type== 'Location' && value ){
      handleFilters( type,value)
      setFilterLocation(value)
    }
    if(type  && type== 'Category' && value ){
      handleFilters( type,value)
      setFilterCategory(value)
    }

    if(type  && type== 'Brough Location' && value ){
      handleFilters( type,value)
      setFilterBroughLocation(value)
    }

    if(type  && type== 'City' && value ){
      let broughsAll = [];
      filters?.cities?.map((item)=>{
        if(item.post_town == value){
          item.broughs?.map((brough)=>{
            console.log(brough.brough)
            if(brough?.brough)
            broughsAll.push(brough?.brough);
          })
        }
      })
      
      if(broughsAll.length>0){
        let allBroughs = [];
        
        allBroughs.push({ value: 'All', label: "All" });
        broughsAll.map((item)=>{
          allBroughs.push({ value: item, label: item })
        })
        setBroughs(allBroughs);
      }

      handleFilters( type,value)
      setFilterCity(value)
      setFilterBrough(null);
      setLocations(null);
    }

    if(type  && type== 'Brough' && value ){
      let locationsAll = [];
      filters?.cities?.map((cityy)=>{
        cityy.broughs?.map((broughh)=>{
          if(broughh.brough == value){
            
            broughh?.locations?.map((locationn)=>{
              locationsAll.push(locationn)
            })
          }
         
        })
         
      })
     
      
      if(locationsAll.length>0){
        let allLocations= [];
        
        allLocations.push({ value: 'All', label: "All" });
        locationsAll.map((item)=>{
          allLocations.push({ value: item.name, label: item.name })
        })
        setLocations(allLocations);
      }

      handleFilters( type,value)
      setFilterBrough(value)
    }
  }
  const fetchFilters =  () =>{
    console.log(filters)
    let options = []
    options.push(  { value: 'All', title: "All" })
    filters?.services?.map((item)=>{
  
      options.push(  { value: item.slug, title: item.name })
    })
    setServiceOptions(options);

    let locations = []
    locations.push({ value: 'All', label: "All" });
    filters?.locations?.map((item)=>{
      locations.push({ value: item?.slug, label: item?.name});
    })
    setLocationOptions(locations);

    let citiesAll = []
    citiesAll.push({ value: 'All', label: "All" });
    filters?.cities?.map((item)=>{
      citiesAll.push({ value: item?.post_town, label: item?.post_town});
    })
    setCities(citiesAll);

    if( city && city !='All' ){
      let broughsAll = [];
      filters?.cities?.map((item)=>{
        if(item.post_town == city){
          item.broughs?.map((brough)=>{
            console.log(brough.brough)
            if(brough?.brough)
            broughsAll.push(brough?.brough);
          })
        }
      })
      
      if(broughsAll.length>0){
        let allBroughs = [];
        
        allBroughs.push({ value: 'All', label: "All" });
        broughsAll.map((item)=>{
          allBroughs.push({ value: item, label: item })
        })
        setBroughs(allBroughs);
      }
    }

    if( brough && brough !='All' ){
      let locationsAll = [];
      filters?.cities?.map((cityy)=>{
        cityy.broughs?.map((broughh)=>{
          if(broughh.brough == brough){
            
            broughh?.locations?.map((locationn)=>{
              locationsAll.push(locationn)
            })
          }
         
        })
         
      })
     
      
      if(locationsAll.length>0){
        let allLocations= [];
        
        allLocations.push({ value: 'All', label: "All" });
        locationsAll.map((item)=>{
          allLocations.push({ value: item.name, label: item.name })
        })
        setLocations(allLocations);
      }

    }
    

  }

  const handleService = (e) => {
    console.log("Selected value:", e.target.value); // Log the selected value
    setFilter('Service',e.target.value); // Update the state with the selected value
  };

  useEffect(()=>{
    fetchFilters()
  },[])

  return (
    <div>
      <Drawer
        title=""
        className="filter-drawer !w-[370px] md:!w-[560px]"
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="py-4 px-12 flex flex-col gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <div className="fs-24-400-qualo txt-color-red">Filters</div>
          </div>
          {/* <div className="">
            <div className="py-2 fs-16-400-lato txt-color-gray700">All</div>
            <div className="py-2 fs-16-400-lato txt-color-gray700">
              Category One
            </div>
            <div className="py-2 fs-16-400-lato txt-color-gray700">
              Category Two
            </div>
            <div className="py-2 fs-16-400-lato txt-color-gray700">
              Category Three
            </div>
          </div> */}
          {isSearchPage ? 
            <div className="" >
              <div className={filterCategory=='All' || !filterCategory ? "py-2 fs-16-700-lato  cursor-pointer txt-color-red":"py-2 fs-16-400-lato txt-color-gray700 cursor-pointer"} onClick={()=>{setFilter('Category','All')}}>All</div>
              {/* <div className={filterCategory=='Female Therapist' ? "py-2 fs-16-700-lato  cursor-pointer txt-color-red":"py-2 fs-16-400-lato txt-color-gray700 cursor-pointer"} onClick={()=>{setFilter('Category','Female Therapist')}}>
                Female Therapists
              </div> */}
              <div className={filterCategory=='Therapists' ? "py-2 fs-16-700-lato  cursor-pointer txt-color-red":"py-2 fs-16-400-lato txt-color-gray700 cursor-pointer"} onClick={()=>{setFilter('Category','Therapists')}}>
                Therapists
              </div>
              <div className={filterCategory=='Agencies' ? "py-2 fs-16-700-lato  cursor-pointer txt-color-red":"py-2 fs-16-400-lato txt-color-gray700 cursor-pointer"} onClick={()=>{setFilter('Category','Agencies')}}>
                Agencies
              </div>
            </div>
          :<></>}
          
          <div className="flex flex-col gap-6">
            {/* <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Incalls
              </div>
              <div className="py-2">
                <CheckBoxComp title={"Option One"} onChange={() => {}} />
              </div>
              <div className="py-2">
                <CheckBoxComp title={"Option Two"} onChange={() => {}} />
              </div>
              <div className="py-2">
                <CheckBoxComp title={"Option Three"} onChange={() => {}} />
              </div>
            </div> */}
            <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Service Type
              </div>
             
              <SelectBox
                defaultValue={filterServiceType ? filterServiceType :'All'}
                
                handleChange={(value) => { setFilter('Service Type',value); }}
                options={selectOptionsList}
              />
            </div>
            {/* <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Services
              </div>
             
              <SelectBox
                defaultValue={filterService ? filterService :'All'}
                
                handleChange={(value) => { setFilter('Service',value);}}
                options={serviceOptions}
              />
            </div> */}
            <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Regions
              </div>
             
              <SelectBox
                defaultValue={filterLocation ? filterLocation :'All'}
                
                handleChange={(value) => { setFilter('Location',value);}}
                options={locationOptions}
              />
            </div>
            <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Post Towns
              </div>
             
              <SelectBox
                defaultValue={filterCity ? filterCity :'All'}
                
                handleChange={(value) => { setFilter('City',value);}}
                options={cities}
              />
            </div>
            {broughs?.length>0 && (
              <div>
                <div className="py-5 fs-18-700-lato txt-color-red">
                  Broughs
                </div>
              
                <SelectBox
                  defaultValue={filterBrough ? filterBrough :'All'}
                  
                  handleChange={(value) => { setFilter('Brough',value);}}
                  options={broughs}
                />
              </div>
            )}

            {locations?.length>0 && (
              <div>
                <div className="py-5 fs-18-700-lato txt-color-red">
                  Locations
                </div>
              
                <SelectBox
                  defaultValue={filterBroughLocation ? filterBroughLocation :'All'}
                  
                  handleChange={(value) => { setFilter('Brough Location',value);}}
                  options={locations}
                />
              </div>
            )}
            
            <div>
              <div className="py-5  fs-18-700-lato txt-color-red">
                Near me distance (km)
              </div>
              <RangeInput handleRange={(value) => { 
                if(value>0){ 
                  setFilter('Radius',value);
                }
              }} min={0} max={7} defaultValue={filterRadius ? filterRadius:0}  />
            </div>
            
            <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Services
              </div>
              <RadioGroupComp
                onChange={handleService}
                value={filterService ? filterService :'All'}
                list={serviceOptions}
              />
            </div>
            {/* <div>
              <div className="py-5 border-t border-[#D0D5DD] fs-18-700-lato txt-color-red">
                Filter Eight
              </div>
              <SwitcherComp checked={false} onChange={() => {}} />
            </div> */}
          </div>
        </div>
        <div className="py-3 px-12 border-t border-[#667085] flex items-center justify-between">
          <div className="fs-16-400-lato txt-color-red cursor-pointer"  onClick={()=>clearAll()}>Clear all</div>
          <button onClick={()=>applyAll()} className="btn sec-btn text-white py-3 px-6 rounded-lg fs-18-700-lato">
            Apply
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default FilterDrawer;
