import { Component, OnInit } from '@angular/core';
import * as data_tft from '../assets/data/tft_matchs.json';
import * as itemsJson from '../assets/data/items.json';
import * as _ from 'lodash';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tft';

  data;
  itemListBase;

  public labels = {
    mostPlayed: [],
    levelAverage: [],
    mostPlayedComp: [],
    mostPlayedChampByCost :[],
    mostItemPicked : []
  }

  public mostPlayed: ChartDataSets[] = [
    {
      label: 'Most played champion',
      data  : []
    }
  ]

  public mostItemPicked: ChartDataSets[] = [
    {
      label: 'Most Item Picked',
      data  : [],
      backgroundColor: 'green'
    }
  ]

  public levelAverage: ChartDataSets[] = [
    {
      label: 'Level average / placement',
      data: [],
      backgroundColor: '#00b2cf'
    }
  ]

  public mostPlayedComp: ChartDataSets[] = [
    {
      label: 'Most played comp',
      data: [],
      backgroundColor : "#fa5c2e"
    }
  ]

  public mostPlayedChampByCost: ChartDataSets[] = [
    {
      label: 'Most played  1 cost champion 3*',
      data  : []
    },
    {
      label: 'Most played 2 cost champion 3',
      data  : []
    },
    {
      label: 'Most played 3 cost champion 3*',
      data  : []
    },
    {
      label: 'Most played 4 cost champion 3*',
      data  : [],
      backgroundColor : '#00b2cf'
      
    },
    {
      label: 'Most played 5 cost champion 3*',
      data  : []
      
    },
    
  ]

  ngOnInit(){
    this.data = (data_tft as any).default;
    this.itemListBase = (itemsJson as any).default;
    console.log(this.data)

    this.mostPlayedChampion();
    this.loadLevelAverage();
    this.getMostPlayedComp();
    this.getMostHigthLevel();
    this.getMostItemPicked();
  }

  getMostItemPicked(){
    let items = [];
    let itemList = []

    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          unit.items.forEach(item => {

            this.itemListBase.forEach(f => {
              if(f.id == item){
                item = f.name
              }
            })
            
            if(items && !items.includes(items) ){
              items.push(unit.character_id);
            
            }
              itemList.push(item);
          })
          
        });
      });
    });

    let itemCount = _.countBy(itemList);
    
    let arr = [];

    Object.keys(itemCount).map(key => {
      arr.push({name: key, count: itemCount[key]})
    });

    let itemsCountFinal = [];

    itemsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

    itemsCountFinal.forEach(champion => {
      this.labels.mostItemPicked.push(champion.name)
      this.mostItemPicked[0].data.push(champion.count)
    });

    
  }

  mostPlayedChampion(){

    let champions = [];
    let championsList = [];

    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champions.includes(unit.character_id) && unit.character_id.includes('TFT4')){
            champions.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4')){
            for (let index = -1; index < unit.tier; index++) {
              championsList.push(unit.character_id)
              
            }
            championsList.push(unit.character_id);
          }
        });
      });
    });

    let championsCount = _.countBy(championsList);
    
    let arr = [];

    Object.keys(championsCount).map(key => {
      arr.push({name: key, count: championsCount[key]})
    });

    let championsCountFinal = [];

    championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");
    console.log(championsCountFinal)

    championsCountFinal.forEach(champion => {
      this.labels.mostPlayed.push(champion.name)
      this.mostPlayed[0].data.push(champion.count / this.data.length)
    });

    console.log(this.mostPlayed)
  }

  getMostHigthLevel(){

    

    let champ2 = [];
    let champlist2 = [];

    let champ1 = [];
    let champlist1 = [];

    let champ3 = [];
    let champlist3 = [];

    let champ4 = [];
    let champlist4 = [];

    let champ5 = [];
    let champlist5 = [];
    
    //1
    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champ1.includes(unit.character_id) && unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 0){
            champ1.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4')  && unit.tier == 3 && unit.rarity == 0){
            champlist1.push(unit.character_id);
          }
        });
      });
    });

    //2
    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champ2.includes(unit.character_id) && unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 1){
            champ2.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 1){
            champlist2.push(unit.character_id);
          }
        });
      });
    });

    //3
    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champ3.includes(unit.character_id) && unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 2){
            champ3.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 2){
            champlist3.push(unit.character_id);
          }
        });
      });
    });

    //4
    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champ4.includes(unit.character_id) && unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 3){
            champ4.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 3){
            champlist4.push(unit.character_id);
          }
        });
      });
    });

    //5
    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.units.forEach(unit => {
          if(unit.character_id && !champ5.includes(unit.character_id) && unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 4){
            champ5.push(unit.character_id);
          }
          if(unit.character_id.includes('TFT4') && unit.tier == 3 && unit.rarity == 4){
            champlist5.push(unit.character_id);
          }
        });
      });
    });

    //1
    let championsCount = _.countBy(champlist1);
    let arr = [];

    Object.keys(championsCount).map(key => {
      arr.push({name: key, count: championsCount[key]})
    });

    let championsCountFinal = [];

    championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

    championsCountFinal.forEach(champion => {
      this.labels.mostPlayedChampByCost.push(champion.name)
      this.mostPlayedChampByCost[0].data.push(champion.count)
    });

    //2
     championsCount = _.countBy(champlist2);
     arr = [];
    Object.keys(championsCount).map(key => {
      arr.push({name: key, count: championsCount[key]})
    });

     championsCountFinal = [];

    championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

    this.labels.mostPlayedChampByCost.forEach(p =>{
      this.mostPlayedChampByCost[1].data.push(0)
    })

    championsCountFinal.forEach(champion => {
      this.labels.mostPlayedChampByCost.push(champion.name)
      this.mostPlayedChampByCost[1].data.push(champion.count)
    });


    //3
    championsCount = _.countBy(champlist3);
    arr = [];
   Object.keys(championsCount).map(key => {
     arr.push({name: key, count: championsCount[key]})
   });

    championsCountFinal = [];

   championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

   this.labels.mostPlayedChampByCost.forEach(p =>{
    this.mostPlayedChampByCost[2].data.push(0)
  })

   championsCountFinal.forEach(champion => {
     this.labels.mostPlayedChampByCost.push(champion.name)
     this.mostPlayedChampByCost[2].data.push(champion.count)
     

   });

   //4
   championsCount = _.countBy(champlist4);
   arr = [];
  Object.keys(championsCount).map(key => {
    arr.push({name: key, count: championsCount[key]})
  });

   championsCountFinal = [];

  championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

  this.labels.mostPlayedChampByCost.forEach(p =>{
    this.mostPlayedChampByCost[3].data.push(0)
  })

  championsCountFinal.forEach(champion => {
    this.labels.mostPlayedChampByCost.push(champion.name)
    this.mostPlayedChampByCost[3].data.push(champion.count)
    
  });

  //5
  championsCount = _.countBy(champlist5);
  arr = [];
 Object.keys(championsCount).map(key => {
   arr.push({name: key, count: championsCount[key]})
 });

  championsCountFinal = [];

 championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

 this.labels.mostPlayedChampByCost.forEach(p =>{
  this.mostPlayedChampByCost[4].data.push(0)
})

 championsCountFinal.forEach(champion => {
   this.labels.mostPlayedChampByCost.push(champion.name)
   this.mostPlayedChampByCost[4].data.push(champion.count)
   this.mostPlayedChampByCost[4].hidden = true;

 });

  }

  loadLevelAverage(){

    let placement = []

    this.data.forEach(match => {
      match.participants.forEach(participant => {
        if(placement[participant.placement]){
          placement[participant.placement].push(participant.level)
        } else {
          placement[participant.placement] = [participant.level]
        }
      });
    });

    console.log(placement)

    placement.forEach((values,key) => {
      console.log(key)
      let sum = values.reduce((a,b) => a+b, 0)
      console.log(sum)
      this.labels.levelAverage.push(key)
      this.levelAverage[0].data.push(sum/values.length)
    })

  }

  getMostPlayedComp(){
    let champions = [];
    let championsList = [];

    this.data.forEach(match => {
      match.participants.forEach(participant => {
        participant.traits.forEach(trait => {
          if(trait.name && !champions.includes(trait.name) && trait.tier_current == trait.tier_total){
            champions.push(trait.character_id);
          }
          if(trait.tier_current == trait.tier_total){
            championsList.push(trait.name);
          }
        });
      });
    });

    console.log(championsList)

    let championsCount = _.countBy(championsList);
    
    let arr = [];

    Object.keys(championsCount).map(key => {
      arr.push({name: key, count: championsCount[key]})
    });

    let championsCountFinal = [];

    championsCountFinal = _.orderBy(arr,[ champion => champion.count],"desc");

    championsCountFinal.forEach(champion => {
      this.labels.mostPlayedComp.push(champion.name)
      this.mostPlayedComp[0].data.push(champion.count)
    });
  }


}
