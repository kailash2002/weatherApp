let loc=document.getElementById("location");
let tempicons=document.getElementById("temp-icons");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
let searchinput=document.getElementById("search-input");
let button=document.getElementById('btn');
button.addEventListener('click', (e)=>{

 e.preventDefault();
   getWeather(searchinput.value);
 searchinput.value="";


});

const getWeather=async(city)=>{
    
        await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5041f13b296bc4da3dc7c344bb4d8563`).then((responce)=>{
            
            let weatherData = responce.data;
            console.log(weatherData);
            const{name}=weatherData;
            const{feels_like}=weatherData.main;
            const{id,main}=weatherData.weather[0];
            loc.textContent=name;
            climate.textContent=main;
            tempvalue.innerHTML=`${Math.round(feels_like-273)}&#176 c`;
            if (id<300&&id>200){
                tempicons.src="./thunderstorm.png"
            }
            else if (id<400&&id>300){
                tempicons.src="./clouds.png"
            }
            else if (id<600&&id>500){
                tempicons.src="./raining.png"
            }
            else if (id<700&&id>600){
                tempicons.src="./snowman.png"
            }
            else if (id<800&&id>700){
                tempicons.src="./atmosphere.png"
            }
            else if(id==800){
                tempicons.src="./sun.png"
            } 
        }).catch((err)=>{
            alert(err.message)
        });
            

        
 }
        
        




    window.addEventListener('load',  ()=>{
        let long;
        let latt;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async(position)=>{
            long=position.coords.longitude;
            latt=position.coords.latitude;
                const api=`https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=5041f13b296bc4da3dc7c344bb4d8563`
                await axios(api)
                .then(data=>{
                 
                 const {name}=data.data;
                 const {feels_like}=data.data.main;
                 const{id,main}=data.data.weather[0];
                 loc.textContent=name;
                 climate.textContent=main;
                 tempvalue.textContent=Math.round(feels_like-273);
    
                 if (id<300&&id>200){
                     tempicons.src="./thunderstorm.png"
                 }
                 else if (id<400&&id>300){
                     tempicons.src="./clouds.png"
                 }
                 else if (id<600&&id>500){
                     tempicons.src="./raining.png"
                 }
                 else if (id<700&&id>600){
                     tempicons.src="./snowman.png"
                 }
                 else if (id<800&&id>700){
                     tempicons.src="./atmosphere.png"
                 }
                 else if(id==800){
                     tempicons.src="./sun.png"
                 }
    
                 console.log(data);
             })
            })
            
        }
    }
    )