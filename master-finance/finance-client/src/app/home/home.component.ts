import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products=[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log(data);
      this.products=data;
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    // unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
