# Abastecimiento · Flujo actual

## Etapa 1: generación de orden de compra

El relevamiento actual alcanza la generación de una **sugerencia de compra en Excel**. Los pasos posteriores hasta la orden de compra todavía están pendientes de documentar.

```mermaid
flowchart LR
    subgraph FUENTES[Fuentes de datos consultadas]
        RH[Recepciones históricas]
        RE[Recepciones]
        ST[Maestro de stock]
        MA[Maestro de materiales]
        PR[Maestro de proveedores]
    end
    DB[Databricks: consulta y recuperación de datos]
    RH --> DB
    RE --> DB
    ST --> DB
    MA --> DB
    PR --> DB

    subgraph REGLAS[Reglas mantenidas en Excel]
        RP[Reglas de proveedores]
        RS[Reglas de SKU]
    end
    subgraph CALCULO[Procesamiento y cálculo]
        NB[Notebook de Python: combina datos y reglas]
        MOD[Modelo matemático: cálculo de sugerencia]
        NB --> MOD
    end
    DB --> NB
    RP --> NB
    RS --> NB
    MOD --> EX[Excel: sugerencia de compra]
```

El notebook de Python está conectado a Databricks para recuperar la información. El modelo matemático se representa como un paso lógico aplicado mediante el notebook, no como un sistema independiente. No se especifican el origen físico de las fuentes ni las fórmulas o el contenido de las reglas.

## Etapa 2: facturación en SAP

Pendiente de relevar y definir.

## Etapa 3: manejo de maestros

Pendiente de relevar y pulir; la propuesta deberá presentarse a gerencia.
