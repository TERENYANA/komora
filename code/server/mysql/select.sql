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

-- SELECT
--     user.*
-- FROM
--     komora_dev.user 
    

--  SELECT 
--                 user.*,
--                 GROUP_CONCAT(address.id) AS address_ids
--              FROM
--                 komora_dev.user
--              JOIN
--                 komora_dev.role
--              ON
--                 role.id = user.role_id
--              LEFT JOIN
--                 komora_dev.user_address
--              ON
--                 user_address.user_id = user.id
--              LEFT JOIN
--                 komora_dev.address
--              ON
--                 user_address.address_id=address.id
--              GROUP BY 
--                 user.id
    SELECT
        