import{SearchService,
    YOUTUBE_API_KEY,YOUTUBE_API_URL
    } from './youtube-search.service';
    
    export const youTubeSearchInjectables:Array<any>=[
        {provide:SearchService,useClass:SearchService},
        {provide:YOUTUBE_API_KEY,useValue:YOUTUBE_API_KEY},
        {provide:YOUTUBE_API_URL,useValue:YOUTUBE_API_URL}
    ];