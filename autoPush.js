#!/usr/bin/env node

const { exec } = require('child_process');
const message = process.argv[2];

console.log(message);

exec('git branch --show-current', (error, stdout, stderr) => {
    if (error) {
        console.error('exec error: ', error);
    }

    exec('git add .', (error, stdout2, stderr2) => {
        if (error) {
            console.error('exec error: ', error);
        }

        exec(`git commit -m "${message}" `, (error, stdout3, stderr3) => {
            if (error) {
                console.error('exec error: ', error);
            }

            exec(`git push origin ${stdout} `, (error, stdout3, stderr3) => {
                if (error) {
                    console.error('exec error: ', error);
                }
            });
        });
    });
});
