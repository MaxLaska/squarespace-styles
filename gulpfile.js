const gulp = require('gulp');
const rename = require('gulp-rename');
const fs = require('fs');

// Lade die Versionsnummer aus version.json
let version = JSON.parse(fs.readFileSync('./version.json')).version;

// Gulp-Task: Beobachtet CSS-Datei und erstellt Version
gulp.task('version', function() {
    return gulp.src('./css/main.css') // Beobachte die generierte CSS-Datei
        .pipe(rename(function(path) {
            path.basename = `main_v${version}`; // Versionsnummer hinzufügen
        }))
        .pipe(gulp.dest('./css')) // Zielordner
        .on('end', function() {
            version = (version >= 20) ? 1 : version + 1; // Zurücksetzen bei 20
            fs.writeFileSync('./version.json', JSON.stringify({ version }));
        });
});

// Gulp-Watcher: Beobachtet die generierte CSS-Datei
gulp.task('watch', function() {
    gulp.watch('./css/main.css', gulp.series('version'));
});

// Task zum Zurücksetzen der Versionsnummer
gulp.task('reset-version', function(done) {
    version = 1; // Setze auf 1 zurück
    fs.writeFileSync('./version.json', JSON.stringify({ version }));
    done();
});
