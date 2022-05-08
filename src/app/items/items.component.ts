import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemDataService } from '../item-data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private itemData: ItemDataService) { }

  model: Item = new Item('dummy','Example Item', 'Example Description', 100, '');

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(this.base64textString.length == 1){ //array has item
        this.itemData.addItem(new Item('dummy',form.value.name, form.value.description,form.value.cost, this.base64textString[0]));
    }else{
        this.itemData.addItem(new Item('dummy',form.value.name, form.value.description,form.value.cost, ''));
    }
    this.base64textString = [];
  }
  base64textString:string[] = [];

onUploadChange(evt: any) {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

handleReaderLoaded(e: any) {
  this.base64textString = [];
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
}

}
