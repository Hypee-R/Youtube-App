import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCBxKhSv74AIImQbT5Ic0CMXys5UChmmEo';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
  constructor(
    private http: HttpClient
  ) {}

  getVideos(){

    const params = new HttpParams()
        .set('key', this.apiKey)
        .set('part', 'snippet')
        .set('maxResults', '8')
        .set('playlistId', this.playList)
        .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(`${this.youtubeURL}/playlistItems`, { params: params })
                .pipe(
                  map( resp =>{
                    this.nextPageToken = resp.nextPageToken;
                    return resp.items
                  }),
                  map(items => items.map(video => video.snippet))
                );
  }

}
