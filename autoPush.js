#!/usr/bin/env node

const { exec } = require('child_process');
const message = process.argv[2];

exec('git branch --show-current', (error, stdout, stderr) => {
    if (error) {
        console.error('exec error: ', error);
    }

    exec('git add .', (error, stdout2, stderr2) => {
        if (error) {
            console.error('exec error: ', error);
        }

        console.log(stdout2);

        exec(`git commit -m "${message}" `, (error, stdout3, stderr3) => {
            if (error) {
                console.error('exec error: ', error);
            }

            console.log(stdout3);

            exec(`git push origin ${stdout} `, (error, stdout4, stderr4) => {
                if (error) {
                    console.error('exec error: ', error);
                }

                console.log(stdout4);
            });
        });
    });
});
