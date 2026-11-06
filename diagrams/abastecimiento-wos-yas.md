# Flujo de abastecimiento: WOS + Modelo YAS

Diagrama editable en Mermaid. GitHub lo renderiza en esta página; el archivo se mantiene privado junto con el repositorio.

```mermaid
flowchart LR
    subgraph FUENTES[Fuentes de datos]
        T[Maestro: Tiendas]
        P[Maestro: Proveedores]
        M[Maestro: Materiales]
        S[Inventario: Stock SCE]
    end

    DB[(Base de datos\nproveedores · materiales · tiendas)]
    T --> DB
    P --> DB
    M --> DB
    S --> DB

    subgraph YAS[Motor de cálculo: Modelo YAS]
        V[Parámetros\nVariables del modelo]
        R[Negocio\nReglas de abastecimiento]
        CALC[Calcular abastecimiento sugerido]
        V --> CALC
        R --> CALC
    end
    S --> CALC
    DB -. "Sin integración directa" .- CALC

    subgraph WOS[Front aplicativo WOS · Abastecimiento]
        AR[Administración\nABM de Reglas]
        AV[Administración\nABM de Variables]
        GRID[Grilla de resultados\nTienda · Proveedor · Material · Sugerido]
        CONF[Confirmar compra]
        AR --> GRID
        AV --> GRID
        GRID --> CONF
    end

    DB <--> GRID
    AR --> R
    AV --> V
    GRID -. "Recalcular · dispara RUN" .-> CALC
    AV -. "Alta / edición de variables" .-> V
    CALC --> GRID

    CONF --> SAP((SAP))
    CONF --> SCE((SCE))

    classDef source fill:#f4f6f8,stroke:#64748b,color:#111827
    classDef model fill:#fee2e2,stroke:#dc2626,color:#7f1d1d
    classDef app fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef destination fill:#fef3c7,stroke:#f59e0b,color:#78350f
    class T,P,M,S,DB source
    class V,R,CALC model
    class AR,AV,GRID,CONF app
    class SAP,SCE destination
```

## Consideraciones

- Las fuentes maestras y de stock alimentan la base de datos; el stock también alimenta el cálculo YAS.
- WOS administra reglas y variables, solicita recálculos y presenta sugerencias para confirmar.
- La confirmación de compra deriva los destinos SAP y SCE.
- La conexión directa Modelo YAS → Base de datos está indicada como no integrada en el diagrama de referencia.
- Validar interfaces y direcciones de flujo con el equipo técnico antes de usarlo como especificación de implementación.
