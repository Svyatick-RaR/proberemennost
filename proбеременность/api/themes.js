import fs from 'fs';
import path from 'path';

const themesPath = path.join(process.cwd(), 'data', 'themes.json');

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'GET') {
        const themes = fs.readFileSync(themesPath, 'utf8');
        res.status(200).json(JSON.parse(themes));
    } 
    else if (req.method === 'POST') {
        const newThemes = req.body;
        fs.writeFileSync(themesPath, JSON.stringify(newThemes, null, 2));
        res.status(200).json({ status: 'ok' });
    }
}