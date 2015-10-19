<aside class="main-sidebar">
    <section class="sidebar">

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
            @foreach (config('menu.admin') as $model)
                <li {{ strpos(request()->url(), $model) !== false }}>
                    <a href="#">
                        <i class="fa fa-link"></i>
                        <span>{{ strtoupper($model) }}</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="{{ url('dashboard/' . $model) }}">All</a></li>
                        <li><a href="{{ url('dashboard/' . $model . '/create') }}">Create new</a></li>
                        <li><a href="{{ url('dashboard/' . $model . '/deleted') }}">Trash</a></li>
                    </ul>
                </li>
            @endforeach
        </ul>
        <!-- /.sidebar-menu -->

    </section>
    <!-- /.sidebar -->
</aside>