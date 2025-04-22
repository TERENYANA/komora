-- sélectionner des enregistrements
-- choisir les clonnes
-- * sélection de toutes les comonnes
-- SELECT 
    -- client.secondname, client.email, client.city
    -- client.*  
-- FROM 
    -- komora_dev.client;
-- WHERE
    -- client.id = 2;    
-- jointure : sélectionner des données présentes dans pleusieurs tables en utilisant 

SELECT
    u.id,
    u.firstname,
    u.lastname,
    o.date,
    GROUP_CONCAT(a.name SEPARATOR ', ') AS addresses
FROM
    komora_dev.user u
JOIN  
    komora_dev.orders o ON o.user_id = u.id
JOIN
    komora_dev.user_address ua ON ua.user_id = u.id
JOIN
    komora_dev.address a ON a.id = ua.address_id
GROUP BY
    u.id,
    u.firstname,
    u.lastname,
    o.date;

