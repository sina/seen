# Quick refresher on binary to base64 string

*Note: Previous audio was stored as base64 strings. Returned to consolidated mp3 for improved performance.*

### use linux base64 for quick no nonsense conversions

- binary (eg. mp3) to string

      base64 -w 0 mp3_sound.mp3 > mp3_sound_base64.txt

- base64 string to binary (eg. mp3)
      
      base64 -d mp3_sound_base64.txt > mp3_sound.mp3

### basic usage in js as data uri string
- prepend appropriate content prefix

      // data:[<mediatype>][;base64],<data>
      // given base64 mp3 audio as string value:
      // SPgUUAAAAFCAYAAAC12


      const sfx01 = 'data:audio/mp3;base64,SPgUUAAAAFCAYAAAC12';

      const au = new Audio();
      au.src = sfx01;
      au.play();