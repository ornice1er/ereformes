import { Component, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sampleSearch',
  standalone:true
})
export class SampleSearchPipe implements PipeTransform {

  transform(value: any, searchText:String): any {
    
    return (searchText != '') ? value.filter((item:any) => {  
        return item?.lastname?.toLowerCase().includes(searchText.toLowerCase()) || 
              item?.firstname?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.birthdate?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.birthplace?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.sex?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.address?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.fonction?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.libsecteur?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.designation?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.sigl?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.adresse_struct?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.telephone?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.libnature?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.lib_couvert?.toLowerCase().includes(searchText.toLowerCase()) ||
              item?.phone?.toLowerCase().includes(searchText.toLowerCase()) 
        }) : value;
  }


}